# PRD (Product Requirements Document)

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | SULYN 프리뷰 |
| **타입** | 싱글 페이지 랜딩 |
| **목적** | 리추얼 스킨케어 브랜드 SULYN의 프리뷰 |
| **언어** | 한국어 (일부 영문 카피) |

---

## 2. 페이지 구조 상세

### 2.1 EpiloguePage 섹션 구성

| 순서 | 섹션명 | 위치 | 
|------|--------|------|
| 1 | **Header** | 상단 고정 | 
| 2 | **Hero** | 첫 섹션 | 
| 3 | **Philosophy** | 두 번째 |
| 4 | **Origin Story** | 세 번째 |
| 5 | **Preview** | 네 번째 |
| 6 | **Footer** | 하단 |

---

## 3. 디자인 시스템

### 3.1 컬러 팔레트 (CSS Variables)
| 변수명 | Hex | 용도 |
|--------|-----|------|
| `--bg-main` | #F5F4F0 | 배경 (Mist White) |
| `--text-primary` | #1A202C | 제목/강조 (Void Navy) |
| `--text-body` | #333333 | 본문 (Dark Gray) |
| `--accent` | #6E8578 | 포인트 (Silent Moss) |
| `--texture` | #CDCAC3 | 테두리/보조 (Clay Grey) |

### 3.2 폰트
| 용도 | 폰트 | 클래스 | Import Code |
|------|------|--------|----------------------------------------|
| Display/제목 | MaruBuri (마루부리) | `font-display` | @import url('https://hangeul.pstatic.net/hangeul_static/css/maru-buri.css') |
| Body/본문 | Pretendard (프리텐다드) | `font-body` | @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css') |

---