/* eslint-disable import/prefer-default-export */
export function getImagesInfo() {
  return new Promise((resolve) => {
    function genFakeImage() {
      const height = Math.round(Math.random() * 400 + 400);
      const width = Math.round(Math.random() * 400 + 400);
      return {
        url: Math.random().toString(),
        width,
        height
      }
    }


    setTimeout(() => {
      resolve({
        images: 'asdfadsfasdfasdfasdf'.split('').map(() => genFakeImage()),
      });
    }, 200);
  });
}
