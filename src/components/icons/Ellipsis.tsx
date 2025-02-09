import React from 'react'

export function Ellipsis(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.5 8C11.5 7.1875 12.1562 6.5 13 6.5C13.8125 6.5 14.5 7.1875 14.5 8C14.5 8.84375 13.8125 9.5 13 9.5C12.1562 9.5 11.5 8.84375 11.5 8ZM6.5 8C6.5 7.1875 7.15625 6.5 8 6.5C8.8125 6.5 9.5 7.1875 9.5 8C9.5 8.84375 8.8125 9.5 8 9.5C7.15625 9.5 6.5 8.84375 6.5 8ZM4.5 8C4.5 8.84375 3.8125 9.5 3 9.5C2.15625 9.5 1.5 8.84375 1.5 8C1.5 7.1875 2.15625 6.5 3 6.5C3.8125 6.5 4.5 7.1875 4.5 8Z"
        fill="#595766"
      />
    </svg>
  )
}
