import { setScreen } from "../../shared/config/router";

export const Menu = () => {
  return (
    <div>
      <h1 onClick={() => setScreen("game")}>Играть нахуй</h1>
    </div>
  );
};
