import { Separator } from "@radix-ui/react-separator"
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"

interface data {
  chapter: string,
  section: string,
  ayat: string,
  text: string
}

export interface ResultProps {
  "message": data[],
  "time": number
}

interface Props {
  result: ResultProps
}

const ResultBox = ({result}:Props) => {
  return <div className="w-full flex flex-col justify-center items-center">
    <Card className="w-full bg-transparent">
      <CardHeader>
        <p className="text-white text-3xl font-semibold">Results</p>
        <p className="text-white text-sm font-light">Found in {result && result.time ? result.time : 0} s</p>
        <hr></hr>
      </CardHeader>
      <CardContent className="w-full">
        <ScrollArea className="h-[290px]">
          {result.message && result.message.length != 0 && result.message.map((res, index) => (
            <div key={index} className="flex flex-col items-center justify-between p-4">
              <div className="w-full h-full p-4 flex flex-col gap-4 bg-black/50 border-l-4 rounded-r-lg border-l-white ">
                <div className="w-full">
                  <p className="text-white text-xl font-semibold">{res.chapter} {res.section}:{res.ayat}</p>
                </div>
                <div className="w-full text-wrap">
                  <p className="text-white text-lg text-clip">{res.text}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  </div>
}

export default ResultBox