import classNames from 'classnames';

type BookmarkProps = {
  className: string;
  width: number;
  height: number;
  isFavorite?: boolean;
  onClick: () => void;
}

export default function Bookmark({ className, width, height, isFavorite, onClick }: BookmarkProps): JSX.Element {
  return (
    <button className={classNames(
      { [`${className}__bookmark-button--active`]: isFavorite },
      `${className}__bookmark-button button`)} type="button" onClick={onClick}
    >
      <svg className={`${className}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}
