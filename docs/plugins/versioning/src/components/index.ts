import { LoadContext, Plugin } from '@docusaurus/types';
import path from 'path';

export default function myDocusaurusPlugin(context: LoadContext): Plugin {
  return {
    name: 'my-docusaurus-plugin',
    async loadContent() {
      // This can be an API call, static content, etc.
      return { message: 'Hello from the plugin!' };
    },
    async contentLoaded({ content, actions }) {
      const { createData, addRoute } = actions;
      const myDataPath = await createData('myData.json', JSON.stringify(content));

      // Add a route to the site
      addRoute({
        path: '/my-plugin-route',
        component: path.resolve(__dirname, 'src/components/MyComponent'),
        exact: true,
      });
    },
  };
}
