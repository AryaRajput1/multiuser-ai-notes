import { Liveblocks } from "@liveblocks/node";

export const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCK_PRIVATE_KEY || ''
  });