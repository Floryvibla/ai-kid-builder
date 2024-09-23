import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Props {
  items?: string[]
  placeholder?: string
  name?: string
}

const ages = [
  "Menos de 3 anos",
  "3 a 6 anos",
  "7 a 9 anos",
  "10 a 12 anos",
  "13+ anos",
]

export function SelectItemBox({
  items = ages,
  placeholder = "Idade da criança",
  name
}:Props) {
  return (
    <Select name={name}>
      <SelectTrigger className="w-[100%] border-gray-300/50">
        Idade da criança
        <SelectValue defaultValue={'3 a 6 anos'} />
      </SelectTrigger>
      <SelectContent className="backdrop-blur-lg bg-black/40 border-none">
        {items.map((item, key) => (
          <SelectItem key={key} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

  )
}
