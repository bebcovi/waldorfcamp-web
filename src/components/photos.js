// @flow
import * as React from 'react'
import {
  InfiniteLoader,
  WindowScroller,
  AutoSizer,
  Grid,
} from 'react-virtualized'
import { debounce } from 'lodash'
import styled from 'react-emotion'
import FadingImage from './fading-image'
import { theme } from '../theme'
import fetchApi from '../utils/fetch-api'
import cl from '../utils/cloudinary'
import { getScreenSizeName } from '../utils/responsive'
import { getIndexFrom2d, getPagesInRange } from '../utils/collection'

const COLUMN_COUNT = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
}
const STATUS_LOADING = 'LOADING'

const Cell = styled.div`
  padding: 0.1rem;
`
const PlaceHolder = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.15);
`
const Image = styled(FadingImage)`
  display: block;
  width: 100%;
  height: 100%;
`

type Photo =
  | typeof STATUS_LOADING
  | {
      id: string,
    }
type Props = {
  perPage: number,
  tags: string[],
  doesScroll: boolean,
}
type State = {
  photos: Photo[],
}

class Photos extends React.Component<Props, State> {
  static defaultProps = {
    perPage: 10,
    tags: [],
    doesScroll: false,
  }

  state = {
    photos: Array(this.props.perPage),
  }

  loadedPhotoIds: string[]
  height: number
  scrollTop: number
  columnCount: number
  onRowsRendered: Function
  registerChild: (instance: typeof Grid) => any

  render() {
    const { perPage, doesScroll } = this.props
    const { photos } = this.state

    if (doesScroll) {
      return (
        <InfiniteLoader
          rowCount={photos.length}
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.loadMoreRows}
        >
          {this.infiniteLoaderChildren}
        </InfiniteLoader>
      )
    }

    return (
      <AutoSizer disableHeight>
        {({ width }) => {
          const screenSizeName = getScreenSizeName({ width, theme })
          const columnCount = COLUMN_COUNT[screenSizeName]
          const columnWidth = width / columnCount
          const rowCount = Math.ceil(perPage / columnCount)
          return (
            <Grid
              width={width}
              height={columnCount * columnWidth}
              columnCount={columnCount}
              columnWidth={columnWidth}
              rowCount={rowCount}
              rowHeight={columnWidth}
              cellRenderer={this.cellRenderer}
            />
          )
        }}
      </AutoSizer>
    )
  }

  isRowLoaded = ({ index }: { index: number }) => {
    const { photos } = this.state
    return typeof photos[index] === 'object'
  }

  loadMoreRows = ({
    startIndex,
    stopIndex,
  }: {
    startIndex: number,
    stopIndex: number,
  }) => {
    const { perPage } = this.props
    return Promise.all(
      getPagesInRange({ startIndex, stopIndex, perPage }).map(page =>
        this.fetchPhotos({ page }),
      ),
    )
  }

  infiniteLoaderChildren = ({
    onRowsRendered,
    registerChild,
  }: {
    onRowsRendered: Function,
    registerChild: Function,
  }) => {
    this.onRowsRendered = onRowsRendered
    this.registerChild = registerChild
    return <WindowScroller>{this.windowScrollerChildren}</WindowScroller>
  }

  windowScrollerChildren = ({
    height,
    scrollTop,
  }: {
    height: number,
    scrollTop: number,
  }) => {
    this.height = height
    this.scrollTop = scrollTop
    return (
      <AutoSizer disableHeight scrollTop={scrollTop}>
        {this.autoSizerChildren}
      </AutoSizer>
    )
  }

  autoSizerChildren = ({ width }: { width: number }) => {
    const { height, scrollTop } = this
    const { photos } = this.state
    const screenSizeName = getScreenSizeName({ width, theme })
    const columnCount = COLUMN_COUNT[screenSizeName]
    const columnWidth = width / columnCount
    const rowCount = Math.ceil(photos.length / columnCount)
    this.columnCount = columnCount
    return (
      <Grid
        ref={this.refGrid}
        width={width}
        height={height}
        autoHeight
        scrollTop={scrollTop}
        columnCount={columnCount}
        columnWidth={columnWidth}
        rowCount={rowCount}
        rowHeight={columnWidth}
        cellRenderer={this.cellRenderer}
        onSectionRendered={this.handleSectionRendered}
      />
    )
  }

  refGrid: React.Ref<typeof Grid>
  grid: ?React.ElementRef<typeof Grid>
  refGrid = (ref: typeof Grid) => {
    this.grid = ref
    this.registerChild(ref)
  }

  cellRenderer = ({
    key,
    style,
    columnIndex,
    rowIndex,
  }: {
    /* eslint-disable react/no-unused-prop-types */
    key: string | number,
    style: {},
    columnIndex: number,
    rowIndex: number,
    /* eslint-enable react/no-unused-prop-types */
  }) => {
    const { photos } = this.state
    const { columnCount } = this
    const index = getIndexFrom2d({
      columnIndex,
      rowIndex,
      columnCount,
    })
    const photo = photos[index]
    if (index > photos.length - 1) {
      return null
    }
    return (
      <Cell key={key} style={style}>
        <PlaceHolder>
          {typeof photo === 'object' ? (
            <Image
              src={cl.url(photo.id, {
                width: 512,
                height: 512,
                crop: 'fill',
                gravity: 'faces',
              })}
            />
          ) : null}
        </PlaceHolder>
      </Cell>
    )
  }

  handleSectionRendered = debounce(({ rowStartIndex, rowStopIndex }) => {
    const { columnCount, onRowsRendered } = this
    return onRowsRendered({
      startIndex: getIndexFrom2d({
        columnIndex: columnCount - 1,
        rowIndex: rowStartIndex,
        columnCount,
      }),
      stopIndex: getIndexFrom2d({
        columnIndex: columnCount - 1,
        rowIndex: rowStopIndex,
        columnCount,
      }),
    })
  }, 150)

  fetchPhotos = async ({ page }: { page: number }) => {
    const { perPage, tags } = this.props
    const stopIndex = page * perPage - 1
    const startIndex = stopIndex - (perPage - 1)

    this.setState(state => {
      const photos = [...state.photos]
      return {
        photos: photos.map((photo, i) => {
          if (i >= startIndex && i <= stopIndex) {
            return photo == null ? STATUS_LOADING : photo
          }
          return photo
        }),
      }
    })

    const res = await fetchApi('/photos', { page, perPage, tags })
    const { data, meta: { total } } = await res.json()

    this.setState(state => {
      const photos = [...state.photos]
      photos.length = total
      photos.splice(startIndex, data.length, ...data)
      return { photos }
    })
  }

  componentDidMount() {
    this.fetchPhotos({ page: 1 })
  }
}

export default Photos
