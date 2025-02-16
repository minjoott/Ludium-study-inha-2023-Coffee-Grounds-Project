// 7_MY_PAGE_CAFE_COFFEE_INPUT

import Big_title_component from "../../component/big_title_component";
import { members_cafe_collection } from "../../redux/middleware";
import { useDispatch, useSelector } from "react-redux";
import { Button_2 } from "../../base_style";
import { useRef } from "react";

const Emission_input_page = () => {
  //

  const dispatch = useDispatch();
  const coffee_status_ref = useRef();
  const coffee_amount_ref = useRef();
  const cafe_id = useSelector((state) => state.login_reducer.cafe_id);
  const cafe_name = useSelector((state) => state.login_reducer.cafe_name);

  const emission_button_fn = (e) => {
    //

    const coffee_status = coffee_status_ref.current.value;
    const coffee_amount = Number(coffee_amount_ref.current.value);

    console.log(cafe_name);
    console.log(coffee_status);
    console.log(coffee_amount);

    // input 비었을 때 예외 처리
    if (!cafe_name || !coffee_status || !coffee_amount) {
      alert("값을 입력해주세요.");
      return;
    }

    // 커피박 양 과도하게 입력하지 못하도록 예외 처리
    if (coffee_amount > 1000) {
      alert("입력된 커피박 양이 과도합니다.");
      return;
    }

    // 커피박 양 과도하게 입력하지 못하도록 예외 처리
    if (isNaN(coffee_amount) || coffee_amount <= 0) {
      alert("입력된 커피박 양이 올바르지 못합니다.");
      return;
    }

    const members_cafe_collection_data = {
      coffee_amount: coffee_amount,
      coffee_status: coffee_status,
      cafe_id: cafe_id,
      cafe_name: cafe_name,
    };

    // 여기서 디스패치 날리면 됩니다.
    dispatch(members_cafe_collection(members_cafe_collection_data));
  };

  return (
    <>
      <Big_title_component title="배출 데이터 입력" />

      <div>
        <label htmlFor="cafe_name">카페명</label>
        <input
          id="cafe_name"
          value={cafe_name || "카페인 중독"}
          disabled
          autoComplete="off"
        />
      </div>

      <legend htmlFor="coffee_status">커피박 상태</legend>
      <select name="" id="" ref={coffee_status_ref} defaultValue={"moisture"}>
        <option value="drying">건조</option>
        <option value="moisture">습기</option>
        <option value="mold">곰팡이</option>
      </select>

      <div>
        <label htmlFor="coffee_amount">커피박 양</label>
        <input id="coffee_amount" ref={coffee_amount_ref} autoComplete="off" />
        kg
      </div>

      <Button_2 onClick={emission_button_fn}>데이터 입력</Button_2>
    </>
  );
};

export default Emission_input_page;
