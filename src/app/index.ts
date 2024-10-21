import PSPDFKit from 'pspdfkit';
import { HighlightingUtils } from './highlight-utils';
import { AI_FINDING_MOCK } from './mock';

async function init() {
  try {
    const instance = await PSPDFKit.load({
      container: '.container',
      document: 'document.pdf',
      baseUrl: `${window.location.protocol}//${window.location.host}/`,
    });

    console.log('PSPDFKit loaded, proceeding with highlighting test...');
    
    // Reproduce the bug by creating highlights and comments
    await HighlightingUtils.handleHighlightingAndComments_TEST(instance, AI_FINDING_MOCK);
    
    // Debug output
    const comments = await instance.getComments();
    console.log('Total comments in instance:', comments.size);
    
  } catch (error) {
    console.error('Error initializing PSPDFKit:', error);
  }
}

init();
