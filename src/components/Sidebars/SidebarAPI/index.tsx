import React from "react"
import EditAPISidebar, { EditProps } from "./Edit"
import ViewAPISidebar, { ViewProps } from "./View"

class SidebarAPI {
	View(props: ViewProps) {
		return <ViewAPISidebar {...props} />
	}
	Edit(props: EditProps) {
		return <EditAPISidebar {...props} />
	}
}
export default new SidebarAPI()
