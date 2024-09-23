'use client'

import {
  Dialog
} from "@/components/ui/dialog"
import React from "react";

interface Props {
  children?: React.ReactNode
  openModal?: boolean
}

export function ModalProvider({ children, openModal=false }:Props) {

  const [open, setOpen] = React.useState(openModal);

  React.useEffect(() => {
    setOpen(openModal);
  }, [openModal])
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
    </Dialog>
  )
}
