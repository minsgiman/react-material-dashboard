import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Frontend as FrontendView,
  Vue as VueView,
  ReactView,
  Javascript as JavascriptView,
  Css as CssView,
  Polymer as PolymerView,
  Nodejs as NodejsView,
  Backend as BackendView,
  MarkdownViewer as MarkdownViewerView,
  Webrtc as WebrtcView,

  NotFound as NotFoundView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/frontend"
      />
      <RouteWithLayout
        component={FrontendView}
        exact
        layout={MainLayout}
        path="/frontend"
      />
      <RouteWithLayout
        component={VueView}
        exact
        layout={MainLayout}
        path="/vue"
      />
      <RouteWithLayout
        component={ReactView}
        exact
        layout={MainLayout}
        path="/react"
      />
      <RouteWithLayout
        component={JavascriptView}
        exact
        layout={MainLayout}
        path="/javascript"
      />
      <RouteWithLayout
        component={CssView}
        exact
        layout={MainLayout}
        path="/css"
      />
      <RouteWithLayout
        component={PolymerView}
        exact
        layout={MainLayout}
        path="/polymer"
      />
      <RouteWithLayout
        component={NodejsView}
        exact
        layout={MainLayout}
        path="/nodejs"
      />
      <RouteWithLayout
        component={BackendView}
        exact
        layout={MainLayout}
        path="/backend"
      />
      <RouteWithLayout
        component={MarkdownViewerView}
        exact
        layout={MainLayout}
        path="/markdown"
      />
      <RouteWithLayout
        component={WebrtcView}
        exact
        layout={MainLayout}
        path="/webrtc"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
