# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소의 코드를 다룰 때 참고하는 지침입니다.

## 프로젝트 개요

Next.js 16, Tailwind CSS v4, shadcn/ui를 사용하는 프로덕션 레디 Turborepo 모노레포 보일러플레이트입니다.

## 언어

모든 주석, 문서, 설명은 반드시 한글로 작성합니다. 코드 자체는 영어를 사용합니다.

## 기술 스택

- **모노레포**: Turborepo + pnpm workspaces
- **프레임워크**: Next.js 16 (App Router, React Compiler)
- **스타일링**: Tailwind CSS v4 + shadcn/ui
- **상태 관리**: Zustand (클라이언트) + TanStack React Query (서버)
- **유효성 검사**: Zod
- **API 클라이언트**: ky
- **다크 모드**: next-themes (class 기반)

## 디렉토리 구조

```
apps/
  web/                        # 메인 Next.js 애플리케이션 (port 3000)
    src/
      app/                    # App Router 페이지 및 레이아웃 (Server Component만 허용)
      components/             # 재사용 가능한 공통 UI 컴포넌트
      features/               # 기능(도메인)별 클라이언트 컴포넌트
      hooks/                  # 커스텀 React 훅
      lib/                    # 유틸리티 (API 클라이언트 등)
      providers/              # React 컨텍스트 프로바이더 (theme, react-query)
      services/               # 서비스 래퍼 (logger, storage)
      stores/                 # Zustand 스토어
      constants/              # 상수 및 설정 값
packages/
  ui/                         # 공유 UI 컴포넌트 (shadcn/ui 기반)
    src/
      lib/utils.ts            # cn() 유틸리티
      button.tsx              # shadcn/ui 컴포넌트 예시
  eslint-config/              # 공유 ESLint 설정
  typescript-config/          # 공유 TypeScript 설정
```

## 명령어

```bash
pnpm dev              # 개발 서버 실행
pnpm build            # 전체 빌드
pnpm lint             # 전체 린트
pnpm format           # Prettier 포맷팅
pnpm format:check     # 포맷팅 확인
pnpm check-types      # 타입 체크
pnpm ui:add <name>    # shadcn/ui 컴포넌트 추가 (packages/ui/src/에 생성)
```

## 아키텍처

### 서버/클라이언트 컴포넌트 분리

`src/app/` 내 파일은 반드시 Server Component를 유지합니다. page.tsx나 layout.tsx에 `'use client'`를 추가하지 않습니다. 클라이언트 로직은 `src/features/` 또는 `src/components/`에 별도 컴포넌트로 분리합니다.

### features 디렉토리

`src/features/`는 기능(도메인) 단위로 클라이언트 컴포넌트를 관리합니다.

- `src/app/`의 Server Component에서 import하여 사용하는 Client Component의 주요 위치
- 여러 기능에서 공통으로 재사용하는 UI는 `src/components/`에, 특정 기능에 종속된 UI는 `src/features/`에 배치
- 예시: `src/features/auth/login-form.tsx`, `src/features/user/user-profile-card.tsx`

### 컴포넌트 분리 원칙

props에 따른 거대한 `if/else` 분기를 지양합니다. `isAdmin`, `isGuest` 같은 역할 props로 UI를 분기하는 만능 컴포넌트 대신, `AdminHeader`, `UserHeader`처럼 역할별로 명확히 분리합니다. Boolean props가 2개 이상이거나 props 이름이 권한/역할을 나타내면 컴포넌트를 분리합니다.

### 파일 구조 원칙

- **파일 1개 = 컴포넌트 1개**: 하나의 파일에 하나의 컴포넌트/기능만 담습니다
- **디렉토리 구조**: 메인 컴포넌트와 동일한 이름의 디렉토리 안에 관련 파일을 배치합니다
  ```
  header/
    header.tsx          # 메인 컴포넌트
    header-nav.tsx      # 하위 컴포넌트
    header-logo.tsx     # 하위 컴포넌트
  ```
- **index.ts 파일 생성 금지**: 직접 파일 import만 사용합니다 (예: `@/features/user/user-profile`, `@/features/user` 금지)
- **단일 파일 책임 원칙**: `auth-actions.ts`를 `login-action.ts`, `logout-action.ts` 등으로 분리합니다

### 코드 격리 원칙

**중복 코드를 섣불리 추상화하지 않습니다.** 비슷한 코드가 여러 곳에 있더라도 각각의 맥락에서 독립적으로 읽히고 수정할 수 있는 것이 더 중요합니다. 공통 유틸리티로 묶으면 한 곳의 변경이 예상치 못한 다른 곳에 영향을 미치고, 코드를 이해하기 위해 여러 파일을 오가야 합니다.

- **기본 원칙**: 중복을 허용합니다. 하나의 파일만 읽으면 동작을 완전히 이해할 수 있어야 합니다
- **추상화가 필요하다고 판단되면**: 직접 하지 말고 먼저 물어볼 것
- **Tailwind을 선호하는 이유**: 스타일이 컴포넌트 안에 co-locate되어 있어서 외부 CSS 파일을 참조할 필요가 없고, 변경의 영향 범위가 해당 컴포넌트로 한정됨

## 코딩 표준

### 네이밍

- **파일명**: kebab-case, 축약어 금지. 서술적 접미사 사용: `-page`, `-section`, `-card`, `-form`, `-modal`, `-dialog`
- **타입/인터페이스**: PascalCase, `I` 접두사 금지
- **아이콘**: 항상 `Icon` 접미사 사용 (예: `ArrowRightIcon`)
- **스토어**: `use-<name>-store.ts` (예: `use-sample-store.ts`)
- **프로바이더**: `<name>-provider.tsx` (예: `theme-provider.tsx`)
- **배럴 export 금지**: 서브패스에서 직접 import (`import { X } from "@repo/ui/button"`)

### 로깅

`@/services/logger`의 `logger`를 사용합니다. 직접적인 `console.*` 호출은 ESLint에 의해 차단됩니다.

### 스토리지

`@/services/local-storage`의 `localStorage` 또는 `@/services/session-storage`의 `sessionStorage`를 사용합니다. 브라우저 API 직접 접근은 ESLint `no-restricted-globals`에 의해 차단됩니다.

### 스타일링

- Global CSS 최소화: Tailwind imports, 폰트, 테마 변수만 `globals.css`에 배치
- `cn()` from `@repo/ui/lib/utils`로 className 병합
- Tailwind 클래스 우선, inline 스타일은 동적 값에만 사용
- 정사각 요소에는 `w-4 h-4` 대신 `size-4` 사용

### 상태 관리

- **클라이언트 상태**: Zustand 스토어 (`src/stores/`)
- **서버 상태**: TanStack React Query

### 규칙

- `no-console`은 ESLint error — `logger` 서비스 사용
- 미사용 변수는 `_` 접두사 필수
- import는 Prettier가 자동 정렬 (React → third-party → aliases → relative)
- 기본은 Server Component, `'use client'`는 명시적으로 선언
- 한국어 (`lang="ko"`) 및 Pretendard 폰트

### 주석

구현 세부사항이 아닌, "계약(보존해야 할 동작)"을 설명하는 주석을 작성합니다. 강제 리마운트를 위한 React `key` 변경 등 비자명한 선택의 의도를 문서화합니다.

## shadcn/ui 컴포넌트 추가

`pnpm ui:add <name>`으로 추가하면 `packages/ui/src/`에 생성됩니다. 앱에서는 `@repo/ui/component-name`으로 import합니다.

## 커밋 컨벤션

```
<type>(<scope>): <요약>

type: feat, fix, docs, style, refactor, test, build, ci, perf, chore
scope: web, ui, config
```

## 환경 변수

- `NEXT_PUBLIC_API_URL` - API 베이스 URL (기본값: `http://localhost:8080`)
