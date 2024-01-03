import "@testing-library/jest-dom";
import "@testing-library/user-event";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => cleanup());
