import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SelectItemBox } from "./select-item"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"

interface Props {
  children?: React.ReactNode
}

export function ModalView({children}:Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ?? 'Abrir'}
      </DialogTrigger>
      <DialogContent className="backdrop-blur-lg bg-black/40 border-gray-300/30 text-white">
        <DialogHeader>
          <DialogTitle className="mb-4 text-primary text-left">Qual é a sua ideia para a história?</DialogTitle>
          <form className="">
            <div className="flex items-center gap-2 mb-3">
              <SelectItemBox/>
            </div>
            <div>
              <Textarea
                placeholder="Escreva a mensagem que deseja transmitir na história da sua criança"
                className="border-gray-300/50 placeholder:text-gray-200/40 focus:border-amber-200/30"
                maxLength={200}
              />
            </div>
            <div>
              <Button 
                variant={'outline'} 
                type="submit"
                className="w-full mt-6 rounded-full backdrop-blur-sm bg-purple-700/30 border-gray-300/30 py-6 hover:bg-purple-700/35">
                Gerar história 
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
