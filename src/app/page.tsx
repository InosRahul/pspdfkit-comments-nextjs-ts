"use client";
import { useEffect, useRef } from 'react';
import PSPDFKit from "pspdfkit";
import { AiFinding, HighlightingUtils } from "./highlight-utils";
import { AI_FINDING_MOCK } from "./mock";

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  let instance: any = null;
  let objectUrl = "";

  // Function to load PSPDFKit instance
  const load = async (document: string) => {
    console.log(`Loading ${document}...`);
    try {
      instance = await PSPDFKit.load({
        document,
        container: containerRef.current,
        baseUrl: `${window.location.protocol}//${window.location.host}/`,
        disableWebAssemblyStreaming: true,
        anonymousComments: false,
      });

      // Call the HighlightingUtils function after instance is loaded
      await HighlightingUtils.handleHighlightingAndComments_TEST(
        instance,
        AI_FINDING_MOCK as unknown as AiFinding[]
      );
    } catch (error) {
      console.error("Failed to load PSPDFKit instance:", error);
    }
  };

  // Handle file change event
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      PSPDFKit.unload(containerRef.current!);

      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }

      objectUrl = URL.createObjectURL(event.target.files[0]);
      await load(objectUrl);
    }
  };

  useEffect(() => {
    // Load initial document on mount
    load("/example_2.pdf");

    return () => {
      // Cleanup PSPDFKit instance on unmount
      PSPDFKit.unload(containerRef.current!);
    };
  }, []);

  return (
    <>
      <input type="file" className="chooseFile" onChange={handleFileChange} />
      <div ref={containerRef} className="container" style={{ height: '100vh' }}></div>
    </>
  );
};

export default App;
