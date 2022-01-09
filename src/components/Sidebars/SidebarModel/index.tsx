import React from "react"

import CreateModelSidebar, { CreateProps } from "./Create"
import EditModelSidebar, { EditProps } from "./Edit"
import ViewModelSidebar, { ViewProps } from "./View"

class SidebarModel {
	View(props: ViewProps) {
		return <ViewModelSidebar {...props} />
	}
	Edit(props: EditProps) {
		return <EditModelSidebar {...props} />
	}
	Create(props: CreateProps) {
		return <CreateModelSidebar {...props} />
	}
}

export default new SidebarModel()
