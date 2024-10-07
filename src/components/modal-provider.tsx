'use client'

import {
  Dialog
} from "@/components/ui/dialog"
import React from "react";

interface Props {
  children?: React.ReactNode
  openModal?: boolean
  onOpenChange?: (isOpen: boolean) => void
}

export function ModalProvider({ children, openModal=false, onOpenChange }:Props) {

  return (
    <Dialog open={openModal} onOpenChange={onOpenChange}>
      {children}
    </Dialog>
  )
}
