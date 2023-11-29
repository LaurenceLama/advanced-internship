interface skeleton {
  width: string | number;
  height: string | number;
  borderRadius: number | undefined;
}

const Skeleton = ({ width, height, borderRadius }: skeleton) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
      }}
    ></div>
  );
};

export default Skeleton;
