import Controls from "./Controls";

const AudioPlayer = () => {
  return (
    <div className="audio-player">
      <div className="inner">
        <div>Display Track</div>
        <Controls />
        <div>Progress Bar</div>
      </div>
    </div>
  );
};
export default AudioPlayer;
