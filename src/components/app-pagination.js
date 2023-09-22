import { AppButton } from "./app-button";

export const AppPagination = ({ itemsPerPage, pageIndex, total, setPageIndex }) => {
    const lastPageIndex = Math.ceil(total / itemsPerPage) - 1;
    return (
        <div>
            <AppButton 
            color={pageIndex === 0 ?"gray": 'black'} 
            disabled={pageIndex === 0}
            onClick={() => setPageIndex(pageIndex - 1)}
            >
                Prev
            </AppButton>
            <span>
                Page {pageIndex + 1}/{lastPageIndex + 1}
            </span>
            <AppButton 
            color={pageIndex === lastPageIndex ?"gray": 'black'} 
            disabled={pageIndex === lastPageIndex}
            onClick={() => setPageIndex(pageIndex + 1)}
            >
                Next
            </AppButton>
            <span>Total: {total} items</span>            
        </div>
    );
};