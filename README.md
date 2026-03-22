# REALTEETH 채용 과제 레포지토리

본 레포지토리는 REALTEETH 프론트엔드 개발자 과제전형의 제출물 이며, 날씨 앱을 구현합니다.

## 프로젝트 실행방법

## 구현한 기능에 대한 설명

## 사용한 기술 스택

- 프로젝트 부트스트랩, 번들링 : vite
- 외부 API 호출 : ky
- 데이터 스키마 검증 : zod

## 기술적 의사결정 및 이유

### 기술적 의사결정 요약 리스트

- import alias: FSD 슬라이스에 명시적 import 경로 구축
- HTTP Client: ky → fetch wrapper 대신 공통 요청 레이어 구성
- 환경변수 관리: .env → API Key 보호
- Runtime Validation: Zod → 외부 API 데이터 검증 (fail-fast)
- External API Structure: provider 기준으로 API 계층 분리

### FSD 슬라이스를 명확히 import - import alias

FSD(Feature-Sliced Design) 구조에서는 각 레이어와 슬라이스의 경계를 명확히 유지하는 것이 중요합니다.  
하지만 상대 경로(e.g `../../shared/api/...`)를 사용할 경우, import 경로가 길어지고 현재 파일의 위치에 따라 의미가 달라져 구조 파악이 어려워집니다.

이를 해결하기 위해 Vite의 alias 기능을 활용하여 `@/`를 프로젝트 루트로 매핑하였습니다. (`vite.config.ts` 참조)

이를 통해 다음과 같은 이점을 얻을 수 있습니다:

- 슬라이스 경계를 기준으로 한 명시적인 import (`@/shared/api/...`)
- 상대 경로 깊이에 의존하지 않는 안정적인 참조
- 코드 이동 및 리팩토링 시 import 수정 비용 감소

결과적으로 import 경로 자체가 아키텍처와 레이어 규칙을 드러내도록 구성하여, 코드 가독성과 유지보수성을 개선하였습니다.

### 외부 API 호출에 관한 의사결정 - ky

외부 API 호출은 브라우저 fetch를 직접 감싸기보다, fetch 기반의 경량 HTTP 클라이언트인 ky를 사용해 공통 요청 레이어를 구성 하였습니다.

이번 과제에서는 요청 전송 자체보다, 응답 검증과 도메인 레이어 분리를 명확히 하는 것이 더 중요하다고 판단 하였습니다.

따라서 HTTP 전송에 필요한 기본 기능은 ky에 맡기고, zod 기반 검증과 에러 표준화는 별도 레이어에서 처리하도록 구성 하였습니다.

### 환경변수 관리 - vite의 .env

외부 openAPI를 호출할 때에는 api key가 필요한 경우가 많습니다.

이번 과제는 public repository에 올려지는 만큼, 불특정 다수에게 api key를 노출하기 보다, 사용 방법을 `.env.example`등으로 제시하고, 실제 `.env`를 숨겨 api key의 남용을 예방하였습니다.

### 외부 API 응답 검증 - Zod

외부 API는 클라이언트에서 제어할 수 없기 때문에 응답 데이터의 형태를 신뢰할 수 없습니다.

TypeScript는 컴파일 타임에만 타입을 보장하므로, 런타임 검증을 위해 Zod를 사용했습니다.

API 응답은 shared/api 레이어에서 검증하며, 실패 시 즉시 에러를 발생시켜 잘못된 데이터가 UI까지 전달되지 않도록 설계했습니다.

- API 스펙 변경에 대한 방어 (fail-fast)
- UI 레이어 타입 안정성 확보
- 데이터 검증 책임 분리

### 외부 API 계층 구조 - provider 기준 분리

외부 API 계층은 weather, geocoding 같은 도메인 기준이 아니라 OpenWeather, OpenCage 같은 provider 기준으로 분리하였습니다.

각 서비스는 base URL, API key 주입 방식, 공통 파라미터, 에러 처리 정책이 다르기 때문에 provider 단위로 클라이언트와 계약을 분리하는 편이 책임 경계를 더 명확하게 만든다고 판단하였습니다.
