// simply use in footer components
const myHoc = (OriginalComponents) => {
  // functional components
  const NewComponent = () => {
    const doSomething = () => {
      console.log("doing something...........");
    };

    return <OriginalComponents value={1} doSomething={doSomething} />;
  };

  return NewComponent;
};
export default myHoc;
