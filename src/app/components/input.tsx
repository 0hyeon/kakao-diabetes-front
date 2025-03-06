import {
  useState,
  useRef,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useImperativeHandle,
} from "react";
import { X } from "lucide-react"; // X 아이콘 (npm install lucide-react 필요)

type InputProps = {
  name: string;
  errors?: string[];
};

const InputComponent = (
  {
    name,
    errors = [],
    readOnly = false,
    ...rest
  }: InputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const [value, setValue] = useState(""); // 입력값 상태 관리
  const inputRef = useRef<HTMLInputElement>(null); // input 요소 접근

  // 부모에서도 ref를 사용할 수 있도록 설정
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  // X 버튼 클릭 시 값 초기화 + 포커스 유지
  const handleReset = () => {
    setValue(""); // 입력값 초기화
    setTimeout(() => inputRef.current?.focus(), 0); // input에 포커스 다시 부여
  };

  return (
    <div className="relative flex flex-col gap-2">
      {/* Input 필드 */}
      <input
        ref={inputRef}
        name={name}
        readOnly={readOnly}
        className="bg-transparent rounded-md w-full h-10 outline-none ring-1 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed pl-3 pr-10"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...rest}
      />

      {/* X 버튼 (입력값이 있고 포커스 상태일 때만 표시) */}
      {value && (
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
          onClick={handleReset} // 값 초기화 후 포커스 유지
        >
          <X size={18} />
        </button>
      )}

      {/* 에러 메시지 */}
      {errors?.map((err, idx) => (
        <span key={idx} className="text-red-500 font-medium">
          {err}
        </span>
      ))}
    </div>
  );
};

// forwardRef 적용 후 컴포넌트 내보내기
export default forwardRef(InputComponent);
