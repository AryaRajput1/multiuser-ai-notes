"use client";

import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import * as Y from "yjs";
import { getYjsProviderForRoom, LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import { useState } from "react";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import stringToColor from "@/lib/stringToColor";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import TranslateDoc from "./TranslateDoc";
import AskQuestion from "./AskQuetion";

export function Editor() {
    const room = useRoom();
    const provider = getYjsProviderForRoom(room);
    const doc = provider.getYDoc()
    const [darkMode, setDarkMode] = useState(false)

  const style = `hover:text-white ${
    darkMode ?
    "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
    : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"}
  `
    if (!provider) {
      return null;
    }

    return <div className="max-w-6xl mx-auto">
      <div className="flex items-ceter gap-2 justify-end mb-10">
        <TranslateDoc doc={doc}/>
        <AskQuestion doc={doc}/>
        <Button className={style} onClick={() => setDarkMode(prev=> !prev)}>{ darkMode ? <SunIcon/> : <MoonIcon/>}</Button>
      </div>
      <BlockNote darkMode={ darkMode} doc={doc} provider={provider} />
    </div>
    }

  
type EditorProps = {
    doc: Y.Doc;
    provider: LiveblocksYjsProvider;
    darkMode: boolean
  };
  
  function BlockNote({ doc, provider, darkMode }: EditorProps) {
    // Get user info from Liveblocks authentication endpoint
    const userInfo = useSelf((me) => me.info);
  
    const editor: BlockNoteEditor = useCreateBlockNote({
      collaboration: {
        provider,
  
        // Where to store BlockNote data in the Y.Doc:
        fragment: doc.getXmlFragment("document-store"),
  
        // Information for this user:
        user: {
          name: userInfo.name,
          color: stringToColor(userInfo?.email)
        },
      },
    });
  
    return (
      <div className="relative max-w-6xl mx-auto">
        <BlockNoteView
          className="min-h-screen"
          editor={editor}
          theme={ darkMode ? 'dark' : 'light'}
          slashMenu={true}
        />
      </div>
    );
  }