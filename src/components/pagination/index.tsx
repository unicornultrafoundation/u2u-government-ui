import { useMemo, useState } from "react";

export interface ChangePageParams {
  page?: number
  limit?: number
}
interface Props {
  limit: number
  total: number
  defaultPage?: number
  onChangePage?: (params: ChangePageParams) => Promise<any>
}
const MAX_ITEMS = 5;
export const Pagination = ({ limit, total, defaultPage, onChangePage }: Props) => {
  const [active, setActive] = useState(defaultPage ?? 1);

  const totalPages = useMemo(() => {
    const remainder = total % limit
    const division = total / limit
    return remainder > 0 ? Math.ceil(division) : Math.floor(division)
  }, [limit, total])

  const getItemProps = (index: number) => ({
    className: `text-base rounded w-[32px] ${active === index ? "bg-neutral-surface-active shadow-2 text-neutral" : "text-text-disabled"}`,
    onClick: async () => {
      if (onChangePage) {
        await onChangePage({
          page: index,
          limit
        });
      }
      setActive(index)
    },
  } as any);

  const next = async () => {
    try {
      if (active === totalPages) return;
      if (onChangePage) {
        await onChangePage({
          page: active + 1,
          limit
        });
      }

      setActive(active + 1);
    } catch (e) {
      console.error("Error changing page:", e)
    }
  };

  const prev = async () => {
    try {
      if (active === 1) return;
      if (onChangePage) {
        await onChangePage({
          page: active - 1,
          limit
        });
      }
      setActive(active - 1);
    } catch (e) {
      console.error("Error changing page:", e)
    }
  };

  if (totalPages === 0) {
    return <></>
  }

  return (
    <div className="flex items-center justify-end my-4">
      <div
        className="flex items-center gap-2 mr-4"
        onClick={prev}
      >
        <button disabled={active === 1} className="text-lg px-3 text-neutral-surface-active font-bold"><i className="fa fa-angle-left"></i></button>
      </div>
      <div className="flex items-center gap-2">
        {
          active > MAX_ITEMS && totalPages > MAX_ITEMS && <span className="text-text-disabled text-xl">..</span>
        }
        {
          Array.from({ length: totalPages }, (x, i) => i + 1).map(pageNum => {
            if (active <= MAX_ITEMS ) {
              return pageNum <= MAX_ITEMS && <button key={pageNum} {...getItemProps(pageNum)}>{pageNum}</button>
            } else if (active > MAX_ITEMS) {
              return pageNum > active - MAX_ITEMS && pageNum <= active && <button key={pageNum} {...getItemProps(pageNum)}>{pageNum}</button>
            }
            return <></>
          })
        }
        {
          active <= MAX_ITEMS && totalPages > MAX_ITEMS && <span className="text-text-disabled text-xl">..</span>
        }
      </div>
      <div
        className="flex items-center gap-2 ml-4"
        onClick={next}
      >
        <button disabled={active === totalPages} className="text-neutral-surface-active font-bold text-lg rounded px-3"><i className="fa fa-angle-right"></i></button>
      </div>
    </div>
  );
}