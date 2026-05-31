# 霍格華茲

零依賴靜態 MVP，可直接開啟 `index.html` 使用。

完整需求書整理在 `REQUIREMENTS.md`。

已包含：

- 首頁世界線／存檔管理頁
- 多存檔列表與繼續遊玩
- 存檔改名、複製世界線、封存、解除封存與刪除
- AI DM 僅讀取當前 active campaign 的 memoryLayer
- 完整備份／還原所有世界線
- 雲端登入介面草案：Email magic link / Google 登入
- 新增乾淨世界線與新角色建立
- AI DM 敘事流程
- 本地離線 DM fallback
- localStorage 存檔
- JSON 存讀檔
- 舊跑團全文匯入
- 每回合狀態快照
- 角色、世界、物品、NPC 記憶、事件旗標
- 自由探索地點列表與地點解鎖狀態
- 世界地圖式地點視圖
- 世界時間 UI
- NPC 信任／好感關係條
- AI DM 結構化記憶層
- 可點開的儲思盆回憶詳情
- NPC 主動對話入口
- 小說全文、JSON、世界摘要匯出
- Character Creator 與 AI 協助捏角入口
- 角色外觀即時預覽
- 分層場景背景／角色立繪槽位
- 全身／半身立繪模式切換與各自匯入槽位
- 固定角色圖像 identity seed 與形象鎖定
- 角色立繪與場景背景生成提示
- 數值說明與 D20 擲骰檢定
- 新增存檔時可選擇是否啟用擲骰系統
- 匯入舊紀錄後可確認明確擷取／劇情推定的角色數值
- 場景素材庫 `assets/scenes/scenes.json`

若要接真實 AI，在右上角設定 API Endpoint、Model 與 API Key。預設 endpoint 為 OpenAI Responses API 相容格式。
