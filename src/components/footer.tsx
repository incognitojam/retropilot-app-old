import { Footer } from "flowbite-react";

export default function RetroPilotFooter(): JSX.Element {
  return (
    <div className="w-full text-center">
      <Footer container={true}>
        <Footer.Copyright
          href="#"
          by="RetroPilot"
          year={2022}
        />
      </Footer>
    </div>
  )
}
