/*
 * SPDX-FileCopyrightText: 2025 cod3ddo@proton.me
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { render } from "solid-js/web";

import "./styles/style.css";
import App from "./app";

// biome-ignore lint/style/noNonNullAssertion: this is ok
render(() => <App />, document.getElementById("root")!);
