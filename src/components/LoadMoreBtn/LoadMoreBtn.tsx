type Props = {
    onLoadMore: ()=>void;
}

export default function LoadMoreBtn({onLoadMore}:Props) {
return <button onClick={onLoadMore}>Load more</button>
}