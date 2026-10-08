"use client"

import { useId, useRef, type ButtonHTMLAttributes, type MouseEvent } from "react"

interface NoticeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  body: string
}

export function NoticeButton({ title, body, children, onClick, ...props }: NoticeButtonProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  function open(event: MouseEvent<HTMLButtonElement>) {
    onClick?.(event)
    if (!event.defaultPrevented) dialog.current?.showModal()
  }

  function close() {
    dialog.current?.close()
  }

  function dismissBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return
    const bounds = event.currentTarget.getBoundingClientRect()
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close()
  }

  return (
    <>
      <button {...props} type={props.type ?? "button"} ref={trigger} onClick={open} aria-haspopup="dialog">
        {children}
      </button>
      <dialog ref={dialog} aria-labelledby={titleId} onClick={dismissBackdrop} onClose={() => trigger.current?.focus()}>
        <div className="row-between">
          <span className="meta">NEXTORA / WORDPRESS THEME PREVIEW</span>
          <button type="button" className="btn btn-secondary" onClick={close} aria-label="Close dialog">✕</button>
        </div>
        <h2 id={titleId}>{title}</h2>
        <p className="lead">{body}</p>
        <button type="button" className="btn btn-secondary" onClick={close}>Back to exploring</button>
      </dialog>
    </>
  )
}
