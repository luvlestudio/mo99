/** 신랑 카카오페이링크, 없으면 ''으로 둔다 */
const kakaoPayGroomLink = [
  '', // 1번째 계좌
  '', // 2번째 계좌
];
/** 신부 카카오페이링크, 없으면 ''으로 둔다  */
const kakaoPayBrideLink = [
  '', // 1번째 계좌
  '', // 2번째 계좌
];

// 페이지 로드 시에 애니메이션 적용
document.addEventListener('DOMContentLoaded', function () {
  const UlElements = document.querySelectorAll('.account-panel ul');
  const KakaoButtonList = [];
  UlElements.forEach((UlElement, ulIndex) => {
    const LiElements = UlElement.querySelectorAll('li');
    LiElements.forEach((element, liIndex) => {
      const copyButton = element.querySelectorAll('button')[0];
      copyButton.addEventListener('click', function () {
        const copyTxt = element.querySelectorAll('p')[0].innerText;
        console.log(copyTxt, 'copyTxt');
        copy(copyTxt);
      });

      const kakaoButton = element.querySelectorAll('button')[1];
      const kakaoPayLinkList =
        ulIndex === 0 ? kakaoPayGroomLink : kakaoPayBrideLink;
      if (kakaoPayLinkList[liIndex]) {
        kakaoButton.addEventListener('click', function () {
          window.location.href = kakaoPayLinkList[liIndex];
        });
      } else {
        kakaoButton.style.display = 'none';
      }
    });
  });
});

function copy(text) {
  // iOS에서는 사용자 상호작용 이벤트 핸들러 내에서 호출되어야 함
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // Clipboard API 사용 시도
      navigator.clipboard
        .writeText(text)
        .then(() => {
          console.log('클립보드 API로 복사 성공');
          alert('클립보드에 복사되었습니다.');
        })
        .catch((err) => {
          console.error('Clipboard API 실패:', err);
          // iOS Safari에서 API 실패시 fallback
          fallbackCopyTextToClipboard(text);
        });
    } else {
      fallbackCopyTextToClipboard(text);
    }
  } catch (err) {
    console.error('복사 중 오류 발생:', err);
    fallbackCopyTextToClipboard(text);
  }
}

function fallbackCopyTextToClipboard(text) {
  try {
    // iOS에 최적화된 fallback 방식
    const el = document.createElement('textarea');
    el.value = text;
    // iOS에서는 스타일링이 중요함
    el.style.position = 'fixed';
    el.style.opacity = '0';
    el.style.top = '0';
    el.style.left = '0';
    el.style.width = '100px';
    el.style.height = '100px';

    document.body.appendChild(el);

    // iOS에서 중요: editable 요소에 포커스 주기
    el.focus();
    el.select();

    // iOS에서는 전체 선택 범위 명시적 지정이 중요
    el.setSelectionRange(0, text.length);

    // 복사 명령 실행
    const success = document.execCommand('copy');

    document.body.removeChild(el);

    if (success) {
      console.log('fallback 방식으로 복사 성공');
      alert('클립보드에 복사되었습니다.');
    } else {
      console.warn('fallback 복사 실패');
      alert(
        '클립보드 복사에 실패했습니다. 수동으로 텍스트를 선택하여 복사해주세요.'
      );
    }
  } catch (err) {
    console.error('fallback 복사 중 오류 발생:', err);
    alert('클립보드 복사에 실패했습니다.');
  }
}
