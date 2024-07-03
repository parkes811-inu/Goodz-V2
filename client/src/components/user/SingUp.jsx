import React from 'react'

const SingUp = () => {
  return (
    <div class="container">

        <div class="join justify-content-center my-5 mx-auto border rounded-3" style="max-width: 400px;padding: 15px;">
            <div class="mt-3">
                <h2 class="text-center fw-bold">회원가입</h2>
            </div>      

        <div class="mt-5 mb-1">
            <form id="signup-form" action="/user/signup" method="post" th:action="@{/user/signup}" th:object="${user}">
                <input type="hidden" th:name="${_csrf.parameterName}" th:value="${_csrf.token}" />
                <!-- 이름 -->
                <div class="form-group mb-3">
                    <label for="username">이름 입력*</label>
                    <input type="text" class="form-control" id="username" name="username" placeholder="예)김조은" th:field="*{username}">
                </div>
                <!-- 주민등록 번호 -->
                <div class="form-group">
                    <label for="birth">주민등록번호 입력*</label>
                    <div class="password_input_container">
                        <!-- 앞자리 -->
                        <input type="text" class="form-control mr-2" id="id-number-front" placeholder="앞자리">
                        <span class="mx-2">-</span>
                        <!-- 뒷자리 -->
                        <input type="password" class="form-control" id="id-number-back" placeholder="뒷자리">
                        <span class="toggle-password" onclick="toggleIdNumberVisibility()">
                            <i class="fa fa-eye-slash"></i>
                        </span>
                    </div>
                    <input type="hidden" id="birth" name="birth" th:field="*{birth}">
                </div>

                <div class="form-check my-4">
                    <input type="checkbox" class="form-check-input" id="mandatory-consent">
                    <div class="d-flex justify-content-between">
                        <label class="form-check-label mx-0" for="mandatory-consent">[필수] 만 14세 이상이며 모두 동의합니다.</label>
                        <a class="btn m-0 p-0" data-bs-toggle="collapse" href="#check1" role="button" aria-expanded="false" aria-controls="collapseExample">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6" width="24px" style="color: gray;">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </a>
                    </div>
                    <div id="check1"  class="collapse overflow-y-scroll border rounded-3 my-2" style="height: 80px; font-size: small; color: rgb(155, 155, 155);">
                        <p>이 헌법은 1988년 2월 25일부터 시행한다. 다만, 이 헌법을 시행하기 위하여 필요한 법률의 제정·개정과 이 헌법에 의한 대통령 및 국회의원의 선거 기타 이 헌법시행에 관한 준비는 이 헌법시행 전에 할 수 있다. 대통령이 궐위된 때 또는 대통령 당선자가 사망하거나 판결 기타의 사유로 그 자격을 상실한 때에는 60일 이내에 후임자를 선거한다.</p>

                        <p>헌법재판소 재판관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니한다. 모든 국민은 행위시의 법률에 의하여 범죄를 구성하지 아니하는 행위로 소추되지 아니하며, 동일한 범죄에 대하여 거듭 처벌받지 아니한다. 대법원장과 대법관이 아닌 법관은 대법관회의의 동의를 얻어 대법원장이 임명한다.</p>

                        <p>모든 국민은 거주·이전의 자유를 가진다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여 그에 관한 필요한 제한과 의무를 과할 수 있다. 법률은 특별한 규정이 없는 한 공포한 날로부터 20일을 경과함으로써 효력을 발생한다.</p>

                        <p>헌법개정은 국회재적의원 과반수 또는 대통령의 발의로 제안된다. 법원은 최고법원인 대법원과 각급법원으로 조직된다. 군인은 현역을 면한 후가 아니면 국무총리로 임명될 수 없다. 국가는 농업 및 어업을 보호·육성하기 위하여 농·어촌종합개발과 그 지원등 필요한 계획을 수립·시행하여야 한다. 국회는 법률에 저촉되지 아니하는 범위안에서 의사와 내부규율에 관한 규칙을 제정할 수 있다.</p>

                        <p>국가는 과학기술의 혁신과 정보 및 인력의 개발을 통하여 국민경제의 발전에 노력하여야 한다. 탄핵소추의 의결을 받은 자는 탄핵심판이 있을 때까지 그 권한행사가 정지된다. 모든 국민은 소급입법에 의하여 참정권의 제한을 받거나 재산권을 박탈당하지 아니한다. 환경권의 내용과 행사에 관하여는 법률로 정한다.</p>
                    </div>
                </div>
                <div class="form-check mb-4">
                    <input type="checkbox" class="form-check-input" id="optional-consent">
                    <div class="d-flex justify-content-between">
                        <label class="form-check-label mx-0" for="optional-consent">[선택] 광고성 정보 수신에 모두 동의합니다.</label>
                        <a class="btn m-0 p-0" data-bs-toggle="collapse" href="#check2" role="button" aria-expanded="false" aria-controls="collapseExample">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6" width="24px" style="color: gray;">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </a>
                    </div>
                    <div id="check2"  class="collapse overflow-y-scroll border rounded-3 my-2" style="height: 80px; font-size: small; color: rgb(155, 155, 155);">
                        <p>이 헌법은 1988년 2월 25일부터 시행한다. 다만, 이 헌법을 시행하기 위하여 필요한 법률의 제정·개정과 이 헌법에 의한 대통령 및 국회의원의 선거 기타 이 헌법시행에 관한 준비는 이 헌법시행 전에 할 수 있다. 대통령이 궐위된 때 또는 대통령 당선자가 사망하거나 판결 기타의 사유로 그 자격을 상실한 때에는 60일 이내에 후임자를 선거한다.</p>

                        <p>헌법재판소 재판관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니한다. 모든 국민은 행위시의 법률에 의하여 범죄를 구성하지 아니하는 행위로 소추되지 아니하며, 동일한 범죄에 대하여 거듭 처벌받지 아니한다. 대법원장과 대법관이 아닌 법관은 대법관회의의 동의를 얻어 대법원장이 임명한다.</p>

                        <p>모든 국민은 거주·이전의 자유를 가진다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여 그에 관한 필요한 제한과 의무를 과할 수 있다. 법률은 특별한 규정이 없는 한 공포한 날로부터 20일을 경과함으로써 효력을 발생한다.</p>

                        <p>헌법개정은 국회재적의원 과반수 또는 대통령의 발의로 제안된다. 법원은 최고법원인 대법원과 각급법원으로 조직된다. 군인은 현역을 면한 후가 아니면 국무총리로 임명될 수 없다. 국가는 농업 및 어업을 보호·육성하기 위하여 농·어촌종합개발과 그 지원등 필요한 계획을 수립·시행하여야 한다. 국회는 법률에 저촉되지 아니하는 범위안에서 의사와 내부규율에 관한 규칙을 제정할 수 있다.</p>

                        <p>국가는 과학기술의 혁신과 정보 및 인력의 개발을 통하여 국민경제의 발전에 노력하여야 한다. 탄핵소추의 의결을 받은 자는 탄핵심판이 있을 때까지 그 권한행사가 정지된다. 모든 국민은 소급입법에 의하여 참정권의 제한을 받거나 재산권을 박탈당하지 아니한다. 환경권의 내용과 행사에 관하여는 법률로 정한다.</p>
                    </div>
                </div>
                
                <button type="button" class="btn btn-block mt-3 w-100" onclick="check()">다음 회원가입 단계</button>
            </form>
        </div>
    </div>
</div>
  )
}

export default SingUp