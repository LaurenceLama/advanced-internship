interface skeleton {
  width: string | number;
  height: string | number;
}

const Skeleton = ({ width, height }: skeleton) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
      }}
    ></div>
  );
};

export default Skeleton;
