import { Layout, Rect, Txt } from "@motion-canvas/2d";
import type { Reference, Vector2 } from "@motion-canvas/core";
import { createKey } from "../utils";

export function Popup({
  ref,
  messages,
  position,
  opacity,
}: {
  ref?: Reference<Rect>;
  messages: string[];
  position?: Vector2;
  opacity?: number;
}) {
  return (
    <Rect
      layout
      ref={ref}
      fill={"#1F2428"}
      padding={32}
      radius={8}
      offsetX={1}
      offsetY={-1}
      opacity={opacity}
      x={position?.x}
      y={position?.y}
    >
      <Layout direction="column" gap={32}>
        {messages.map((message) => (
          <Txt
            key={createKey()}
            fontSize={24}
            maxWidth={760}
            fontFamily={"JetBrains Mono"}
            textWrap={true}
            fill={"#FFD580"}
          >
            {message}
          </Txt>
        ))}
      </Layout>
    </Rect>
  );
}
