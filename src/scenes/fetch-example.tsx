import {
  makeScene2D,
  type Code,
  type Rect,
  type View2D,
} from "@motion-canvas/2d";
import {
  DEFAULT,
  Vector2,
  all,
  beginSlide,
  createRef,
  easeOutExpo,
  fadeTransition,
  waitFor,
} from "@motion-canvas/core";
import { JSCode, Popup } from "../nodes";

function* createPopup(view: View2D, messages: string[], position: Vector2) {
  const popup = createRef<Rect>();

  yield view.add(
    <Popup ref={popup} messages={messages} position={position} opacity={0} />
  );

  yield popup().opacity(1, 0.6);

  return popup;
}

export default makeScene2D(function* (view) {
  const code = createRef<Code>();

  yield* beginSlide("1.0");

  yield view.add(
    <JSCode
      ref={code}
      fontSize={24}
      lineHeight={36}
      fontFamily={"JetBrains Mono"}
      offsetX={-1}
      x={-960 / 2}
      code={() => `\
async function createFoo(): Promise<Foo> {
  const request = { fooId: "cuid", bar: BigInt(42) };
  const body = JSON.stringify(request);
            
  const response = await fetch("https://example.com/api/foo", {
    method: "POST",
    body,
  });

  if (!response.ok) {
    throw new Error("Failed to create foo");
  }

  return response.json();
}`}
    />
  );

  yield* fadeTransition(0.6);

  yield* beginSlide("1.1");

  yield* code().code(
    `\
async function createFoo(): Promise<Foo> {
  const request = { fooId: "cuid", bar: BigInt(42) };
  const body = JSON.stringify(request);

  try {
    const response = await fetch("https://example.com/api/foo", {
      method: "POST",
      body,
    });

    if (!response.ok) {
      throw new Error("Failed to create foo");
    }

    return response.json();
  } catch (error) {
    sendErrorReport(error);
    throw new Error("Unexpected error occurred");
  }
}`,
    0.6
  );

  yield* beginSlide("1.2");

  yield all(
    code().x(-960 + 64, 1, easeOutExpo),
    code().selection(code().findAllRanges(/JSON.stringify\(request\);/gi), 0.6)
  );

  yield* waitFor(0.3);

  const jsonStringifyPopup = yield* createPopup(
    view,
    [
      "(method) JSON.stringify(value: any, ...): string",
      "Converts a JavaScript value to a JSON string.",
      "@Param value - A JavaScript value, usually an object or array, to be converted.",
    ],
    new Vector2(1200, -350)
  );

  yield* jsonStringifyPopup().x(960 - 64, 0.6, easeOutExpo);

  yield* beginSlide("1.3");

  yield all(
    jsonStringifyPopup().y(-150, 0.8, easeOutExpo),
    jsonStringifyPopup().opacity(0.3, 0.6),
    code().selection(code().findAllRanges(/bar: BigInt\(42\)/gi), 0.6)
  );

  const bigintErrorPopup = yield* createPopup(
    view,
    [
      "const body = JSON.stringify(request);",
      "TypeError: Do not know how to serialize a BigInt \n at JSON.stringify (<anonymous>)",
    ],
    new Vector2(1200, -350)
  );

  yield* bigintErrorPopup().x(960 - 64, 0.6, easeOutExpo);

  yield* beginSlide("1.4");

  yield* all(
    jsonStringifyPopup().opacity(1, 0.6),
    bigintErrorPopup().opacity(0.3, 0.6),
    code().selection(code().findAllRanges(/JSON.stringify\(request\);/gi), 0.6)
  );

  yield* beginSlide("1.5");

  yield code().selection(DEFAULT, 0.6);

  yield jsonStringifyPopup().opacity(0, 0.6);

  yield* waitFor(0.2);

  yield bigintErrorPopup().opacity(0, 0.6);

  yield* waitFor(0.4);

  yield* code().x(-960 / 2, 1, easeOutExpo);
});
