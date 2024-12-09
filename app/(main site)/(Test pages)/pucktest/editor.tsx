import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";
 
// Create Puck component config
const config = {
  components: {
    HeadingBlock: {
      fields: {
        children: {
          type: "text",
        },
      },
      render: ({ children }) => {
        return <h1>{children}</h1>;
      },
    },
  },
};
 
// Describe the initial data
const initialData = {};
 
// Save the data to your database
const save = (data) => {};
 
// Render Puck editor
export function Editor() {
  return <Puck config={config} data={initialData} onPublish={save} />;
}