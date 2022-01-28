import Create, { CreateProps } from "./Create"
import { Edit, EditProps } from "./Edit"
import View, { ViewProps } from "./View"

class SidebarSchema {
	View(props: ViewProps) {
		return <View {...props} />
	}

	Create(props: CreateProps) {
		return <Create {...props} />
	}
	Edit(props: EditProps) {
		return <Edit {...props} />
	}
}

export default new SidebarSchema()
