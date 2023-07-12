import { launchFullScreen } from "./fullScreen";
export function screenOrientation (loadingContent, label) {
  launchFullScreen(document.documentElement);
  if(screen.orientation.type === 'landscape-secondary' || screen.orientation.type === 'landscape-primary' ) {
    loadingContent.style.display = 'none';
    return;
  }

  loadingContent.style.display = 'flex';
  label.innerText = 'Rotate device!';
}