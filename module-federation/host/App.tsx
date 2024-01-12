// eslint-disable-next-line import/no-extraneous-dependencies
import { Federated } from '@callstack/repack/client';
import React from 'react';
import { Text, SafeAreaView } from 'react-native';


class ModuleState {
  private modules: { [key: string]: React.LazyExoticComponent<React.ComponentType<any>> } = {};

  constructor() {
    this.modules = {};
  }

  importModule(containerName: string, module: string): React.LazyExoticComponent<React.ComponentType<any>> {
    const key = `${containerName}|${module}`
    if (this.modules[key]) {
      return this.modules[key];
    }
    else {
      const app: React.LazyExoticComponent<React.ComponentType<any>> = React.lazy(() => Federated.importModule(containerName, module));
      this.modules[key] = app;
      return app;
    }
  }
}
  
const moduleStates = new ModuleState();

// const App1 = React.lazy(() => Federated.importModule('app1', './App'));
// const App2 = React.lazy(() => Federated.importModule('app2', './App'));

export default function App() {

  const App1 = moduleStates.importModule('app1', './App')
  const App2 = moduleStates.importModule('app2', './App')

  return (
    <SafeAreaView>
      <Text>Host App</Text>
      <React.Suspense fallback={<Text>Loading app1...</Text>}>
        <App1 />
      </React.Suspense>
      <React.Suspense fallback={<Text>Loading app2...</Text>}>
        <App2 />
      </React.Suspense>
    </SafeAreaView>
  );
}
