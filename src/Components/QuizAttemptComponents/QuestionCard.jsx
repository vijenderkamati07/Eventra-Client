const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
}) => {
  return (
    <div className="bg-[#0C0D0F] border border-white/[0.06] rounded-2xl p-6 md:p-8">
      
      {/* Question Number */}
      <p className="text-sm text-[#8A8F98] mb-4">
        Question {questionNumber} of {totalQuestions}
      </p>

      {/* Tags */}
      {question.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {question.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded-full text-xs bg-white/[0.03] border border-white/[0.06] text-[#8A8F98]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Question */}
      <h2 className="text-xl md:text-2xl font-semibold text-white leading-relaxed mb-8">
        {question.question}
      </h2>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;

          return (
            <button
              key={index}
              onClick={() => onSelectAnswer(index)}
              className={`w-full text-left p-4 rounded-xl border transition-colors cursor-pointer
              
              ${
                isSelected
                  ? "border-white bg-white/[0.04]"
                  : "border-white/[0.06] bg-[#08090A] hover:bg-white/[0.03]"
              }`}
            >
              <div className="flex items-center gap-4">
                
                {/* Option Letter */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium shrink-0
                  
                  ${
                    isSelected
                      ? "bg-white text-black"
                      : "bg-white/[0.04] text-[#8A8F98]"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </div>

                {/* Option Text */}
                <span className="text-white leading-relaxed">
                  {option}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;