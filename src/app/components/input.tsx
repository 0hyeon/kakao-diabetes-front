import {
  useState,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useRef,
  useImperativeHandle,
} from "react";
import { X } from "lucide-react"; // 아이콘 사용

type InputProps = {
  name: string;
  errors?: string[];
};

const _Input = (
  {
    name,
    errors = [],
    readOnly = false,
    ...rest
  }: InputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  // 내부에서 사용할 ref 선언
  const inputRef = useRef<HTMLInputElement>(null);

  // forwardRef를 통해 외부에서도 focus 제어 가능하도록 설정
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  // X 버튼 클릭 시 값 초기화 + 포커스 유지
  const handleReset = () => {
    setValue(""); // 값 초기화
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
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />

      {/* X 버튼 (입력값이 있고, 포커스 상태일 때만 표시) */}
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

// forwardRef를 사용하여 부모 컴포넌트에서도 ref 접근 가능하게 설정
export default forwardRef(_Input);
