/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as RegisterImport } from "./routes/register";
import { Route as LoginImport } from "./routes/login";
import { Route as ExerciseImport } from "./routes/exercise";
import { Route as IndexImport } from "./routes/index";

// Create/Update Routes

const RegisterRoute = RegisterImport.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => rootRoute,
} as any);

const LoginRoute = LoginImport.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => rootRoute,
} as any);

const ExerciseRoute = ExerciseImport.update({
  id: "/exercise",
  path: "/exercise",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/exercise": {
      id: "/exercise";
      path: "/exercise";
      fullPath: "/exercise";
      preLoaderRoute: typeof ExerciseImport;
      parentRoute: typeof rootRoute;
    };
    "/login": {
      id: "/login";
      path: "/login";
      fullPath: "/login";
      preLoaderRoute: typeof LoginImport;
      parentRoute: typeof rootRoute;
    };
    "/register": {
      id: "/register";
      path: "/register";
      fullPath: "/register";
      preLoaderRoute: typeof RegisterImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "/exercise": typeof ExerciseRoute;
  "/login": typeof LoginRoute;
  "/register": typeof RegisterRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "/exercise": typeof ExerciseRoute;
  "/login": typeof LoginRoute;
  "/register": typeof RegisterRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/exercise": typeof ExerciseRoute;
  "/login": typeof LoginRoute;
  "/register": typeof RegisterRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: "/" | "/exercise" | "/login" | "/register";
  fileRoutesByTo: FileRoutesByTo;
  to: "/" | "/exercise" | "/login" | "/register";
  id: "__root__" | "/" | "/exercise" | "/login" | "/register";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  ExerciseRoute: typeof ExerciseRoute;
  LoginRoute: typeof LoginRoute;
  RegisterRoute: typeof RegisterRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ExerciseRoute: ExerciseRoute,
  LoginRoute: LoginRoute,
  RegisterRoute: RegisterRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/exercise",
        "/login",
        "/register"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/exercise": {
      "filePath": "exercise.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
