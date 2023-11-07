import useScreenWidth from "./useScreenWidth";

export default function useIsMobile() {
  const isMobile = useScreenWidth() <= 480;

  return isMobile;
}
