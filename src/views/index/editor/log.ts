export const log = `[14:15:35.902][JSON][INFO ][TxnBusinessThread] <START [4920332d7fdc4ca6a1b2039d2030717e]>
[14:15:35.906][JSON][INFO ][TxnBusinessThread] Cliet IP:127.0.0.1,receiveTime:1635228935874
[14:15:35.908][JSON][INFO ][TxnFlowProcess] TxnFlowProcess:4920332d7fdc4ca6a1b2039d2030717e start ...
[14:15:35.910][JSON][INFO ][GapsBpmExecute] Channel BPM id:JSON start...
[14:15:36.358][JSON][INFO ][PreUnPackHandler]  PreUnPackHandler execFlow was completed
[14:15:36.364][JSON][INFO ][ChildProcess] ChildProcess:JSON_TXN_101_BPM start...
[14:15:36.391][JSON][INFO ][UnPackHandler] unpack result String :
{CARD_NO=621735*********3784, SERVER_ID=, TRACK_2_DATA=*************************************, POS_COND_CODE=, USER_ID=, TRAN_TIMESTAMP=, CARD_SEQ_NO=***, SPECIFIC_DATA=STM-000000000.980.98000000001.60.26.3STMYW7779120210922171518    6217359901022913784             莫伯超                                                                                                                  6217359901017878539             测试账户1000234705                                                                                                      666.00        9F0432016EF8427F1522722198409022317                                                                            10000066004020210922000000415450W486777900          001838                                                                                                                                                                                           110250122010030699   1106256890, SEC_RELATD_CTRL_INFO=2400000000000000, CURRCY_CODE_TRANS=156, SOURCE_TYPE=, MCHNT_TYPE=6011, DEVICE_BATCH_SN=, MENU_CODE=, POS_ENTRY_MODE=0051, messageHead=, MAC=********************************, TRACK_3_DATA=, WS_ID=, SEQ_NO_CLIENT=, PASSWORD=****************, TX_AMT=****, TRAN_DATE=, BRANCH_ID=1681, FD55=************************************************************************************************************************************************************************************************************************************************************************************************, TRAN_VERSION=, TRAN_CODE=301000, POS_PIN_CAPTR_CODE=}
[14:15:36.391][JSON][INFO ][UnPackHandler]  UnPackHandler execFlow was completed
[14:15:36.391][JSON][INFO ][ChildProcess] ChildProcess:JSON-HOST_TXN_FLOWTEMPLATE_TEMPLATE-001 start...
[14:15:36.414][JSON][INFO ][PackHandler] pack result String :
{"Message":{"Body":{"CARD_NO":"6217359901022913784","CARD_SEQ_NO":"000","FD55":"9F26088867471DBE1F582E9F2701809F101307010103A02000040A0100000000007EE778699F3704CEA273829F36021A689505808004E0019A032109239C01319F02060000000000005F2A02015682027C009F1A0201569F03060000000000009F33036040209F34030203009F3501149F1E0841424344313233348408A0000003330101019F090200209F4103002102"},"Sys_Head":{"SERVER_ID":"","SERVICE_CODE":"SVR_INQUIRY","USER_ID":"","TRAN_TIMESTAMP":"","CONSUMER_ID":"CBS","WS_ID":"","SEQ_NO":"","TRAN_MODE":"ONLINE","SOURCE_TYPE":"VC","TX_AMT":"5000","SOURCE_BRANCH_NO":"000001","TRAN_DATE":"","BRANCH_ID":"","TRAN_CODE":"301000"}}}
[14:15:36.434][JSON][INFO ][PackHandler] PackHandler execFlow was completed
[14:15:36.484][JSON][ERROR][EN0002] errorCode:EN0002;errorInfo:java.lang.Exception: HttpShortConnection connect failed.Url:http://10.1.231.60:64004
	at com.grgbanking.ilink.core.component.communicate.http.shortconnection.HttpShortConnection.incoming(HttpShortConnection.java:49)
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:498)
	at com.grgbanking.ilink.core.utils.ExecClassMethod.invokeMethod(ExecClassMethod.java:106)
	at com.grgbanking.ilink.core.utils.ExecClassMethod.execMethod(ExecClassMethod.java:24)
	at com.grgbanking.ilink.core.bpm.handler.component.CommunicateHandler.execFlow(CommunicateHandler.java:34)
	at com.grgbanking.ilink.core.bpm.manage.GapsBpmExecute.startFlow(GapsBpmExecute.java:133)
	at com.grgbanking.ilink.core.bpm.handler.base.SubFlowItemHandler.execFlow(SubFlowItemHandler.java:41)
	at com.grgbanking.ilink.core.bpm.manage.GapsBpmExecute.startFlow(GapsBpmExecute.java:91)
	at com.grgbanking.ilink.core.bpm.handler.base.SubFlowItemHandler.execFlow(SubFlowItemHandler.java:41)
	at com.grgbanking.ilink.core.bpm.manage.GapsBpmExecute.startFlow(GapsBpmExecute.java:91)
	at com.grgbanking.ilink.core.bpm.manage.GapsBpmExecute.executeProcess(GapsBpmExecute.java:46)
	at com.grgbanking.ilink.core.server.txn.TxnFlowProcess.executeProcess(TxnFlowProcess.java:40)
	at com.grgbanking.ilink.core.server.thread.HttpBusinessThread.run(HttpBusinessThread.java:73)
	at java.lang.Thread.run(Thread.java:748)

[14:15:36.484][JSON][ERROR][EBB002] Transaction process execution exception! errorInfo:com.grgbanking.ilink.core.common.exception.transaction.GapsTxnException
	at com.grgbanking.ilink.core.bpm.manage.GapsBpmExecute.executeProcess(GapsBpmExecute.java:50)
	at com.grgbanking.ilink.core.server.txn.TxnFlowProcess.executeProcess(TxnFlowProcess.java:40)
	at com.grgbanking.ilink.core.server.thread.HttpBusinessThread.run(HttpBusinessThread.java:73)
	at java.lang.Thread.run(Thread.java:748)

[14:15:36.489][JSON][INFO ][CodeConvertHandler] CodeConvertHandler was Completed...
[14:15:36.490][JSON][INFO ][PackHandler] pack result String :
{"Body":"","Sys_Head":{"SEQ_NO":"","RET_ARRAY":{"Row":{"RET_CODE":"68","RET_MSG":"connect failed!"}},"TRAN_TIMESTAMP":"","HOST_SEQ_NO":"","RET_STATUS":"","TRAN_DATE":"","MAC":"********************************","TRAN_CODE":"301000","WS_ID":""}}
[14:15:36.490][JSON][INFO ][PackHandler] PackHandler execFlow was completed
[14:15:36.490][JSON][INFO ][TxnFlowProcess] Channel Exception BPM  end...
[14:15:36.500][JSON][INFO ][TxnBusinessThread] <END [4920332d7fdc4ca6a1b2039d2030717e] ''''''00'>

[14:15:47.123][JSON][INFO ][TxnBusinessThread] <START [2bb30ef9f45740f88e98a8d2282d91c8]>
[14:15:47.123][JSON][INFO ][TxnBusinessThread] Cliet IP:127.0.0.1,receiveTime:1635228947121
[14:15:47.123][JSON][INFO ][TxnFlowProcess] TxnFlowProcess:2bb30ef9f45740f88e98a8d2282d91c8 start ...
[14:15:47.123][JSON][INFO ][GapsBpmExecute] Channel BPM id:JSON start...
[14:15:47.131][JSON][ERROR][PreUnpackProcess] errorCode:PreUnpackProcess;errorInfo:java.lang.Exception: txnType:null is not exit!
	at com.grgbanking.ilink.core.bpm.handler.component.PreUnPackHandler.execFlow(PreUnPackHandler.java:47)
	at com.grgbanking.ilink.core.bpm.manage.GapsBpmExecute.startFlow(GapsBpmExecute.java:109)
	at com.grgbanking.ilink.core.bpm.manage.GapsBpmExecute.executeProcess(GapsBpmExecute.java:46)
	at com.grgbanking.ilink.core.server.txn.TxnFlowProcess.executeProcess(TxnFlowProcess.java:40)
	at com.grgbanking.ilink.core.server.thread.HttpBusinessThread.run(HttpBusinessThread.java:73)
	at java.lang.Thread.run(Thread.java:748)

[14:15:47.131][JSON][ERROR][EBB002] Transaction process execution exception! errorInfo:com.grgbanking.ilink.core.common.exception.transaction.GapsTxnException
	at com.grgbanking.ilink.core.bpm.manage.GapsBpmExecute.executeProcess(GapsBpmExecute.java:50)
	at com.grgbanking.ilink.core.server.txn.TxnFlowProcess.executeProcess(TxnFlowProcess.java:40)
	at com.grgbanking.ilink.core.server.thread.HttpBusinessThread.run(HttpBusinessThread.java:73)
	at java.lang.Thread.run(Thread.java:748)

[14:15:47.132][JSON][INFO ][CodeConvertHandler] CodeConvertHandler was Completed...
[14:15:47.132][JSON][INFO ][PackHandler] pack result String :
{"Body":"","Sys_Head":{"SEQ_NO":"","RET_ARRAY":{"Row":{"RET_CODE":"96","RET_MSG":"System Exception!"}},"TRAN_TIMESTAMP":"","HOST_SEQ_NO":"","RET_STATUS":"","TRAN_DATE":"","MAC":"","TRAN_CODE":"","WS_ID":""}}
[14:15:47.133][JSON][INFO ][PackHandler] PackHandler execFlow was completed
[14:15:47.133][JSON][INFO ][TxnFlowProcess] Channel Exception BPM  end...
[14:15:47.133][JSON][INFO ][TxnBusinessThread] <END [2bb30ef9f45740f88e98a8d2282d91c8] ''''''00'>

[14:15:55.663][JSON][INFO ][TxnBusinessThread] <START [9cc800d557704f9097972fddc6eb2202]>
[14:15:55.663][JSON][INFO ][TxnBusinessThread] Cliet IP:127.0.0.1,receiveTime:1635228955662
[14:15:55.664][JSON][INFO ][TxnFlowProcess] TxnFlowProcess:9cc800d557704f9097972fddc6eb2202 start ...
[14:15:55.664][JSON][INFO ][GapsBpmExecute] Channel BPM id:JSON start...
[14:15:55.670][JSON][INFO ][PreUnPackHandler]  PreUnPackHandler execFlow was completed
[14:15:55.670][JSON][INFO ][ChildProcess] ChildProcess:JSON_TXN_101_BPM start...
[14:15:55.693][JSON][INFO ][UnPackHandler] unpack result String :
{CARD_NO=621735*********3784, SERVER_ID=, TRACK_2_DATA=*************************************, POS_COND_CODE=, USER_ID=, TRAN_TIMESTAMP=, CARD_SEQ_NO=***, SPECIFIC_DATA=STM-000000000.980.98000000001.60.26.3STMYW7779120210922171518    6217359901022913784             莫伯超                                                                                                                  6217359901017878539             测试账户1000234705                                                                                                      666.00        9F0432016EF8427F1522722198409022317                                                                            10000066004020210922000000415450W486777900          001838                                                                                                                                                                                           110250122010030699   1106256890, SEC_RELATD_CTRL_INFO=2400000000000000, CURRCY_CODE_TRANS=156, SOURCE_TYPE=, MCHNT_TYPE=6011, DEVICE_BATCH_SN=, MENU_CODE=, POS_ENTRY_MODE=0051, messageHead=, MAC=********************************, TRACK_3_DATA=, WS_ID=, SEQ_NO_CLIENT=, PASSWORD=****************, TX_AMT=****, TRAN_DATE=, BRANCH_ID=1681, FD55=************************************************************************************************************************************************************************************************************************************************************************************************, TRAN_VERSION=, TRAN_CODE=301000, POS_PIN_CAPTR_CODE=}
[14:15:55.693][JSON][INFO ][UnPackHandler]  UnPackHandler execFlow was completed
[14:15:55.694][JSON][INFO ][ChildProcess] ChildProcess:JSON-HOST_TXN_FLOWTEMPLATE_TEMPLATE-001 start...
[14:15:55.696][JSON][INFO ][PackHandler] pack result String :
{"Message":{"Body":{"CARD_NO":"6217359901022913784","CARD_SEQ_NO":"000","FD55":"9F26088867471DBE1F582E9F2701809F101307010103A02000040A0100000000007EE778699F3704CEA273829F36021A689505808004E0019A032109239C01319F02060000000000005F2A02015682027C009F1A0201569F03060000000000009F33036040209F34030203009F3501149F1E0841424344313233348408A0000003330101019F090200209F4103002102"},"Sys_Head":{"SERVER_ID":"","SERVICE_CODE":"SVR_INQUIRY","USER_ID":"","TRAN_TIMESTAMP":"","CONSUMER_ID":"CBS","WS_ID":"","SEQ_NO":"","TRAN_MODE":"ONLINE","SOURCE_TYPE":"VC","TX_AMT":"5000","SOURCE_BRANCH_NO":"000001","TRAN_DATE":"","BRANCH_ID":"","TRAN_CODE":"301000"}}}
[14:15:55.716][JSON][INFO ][PackHandler] PackHandler execFlow was completed
[14:15:55.721][JSON][ERROR][EN0002] errorCode:EN0002;errorInfo:java.lang.Exception: HttpShortConnection connect failed.Url:http://10.1.231.60:64004
	at com.grgbanking.ilink.core.component.communicate.http.shortconnection.HttpShortConnection.incoming(HttpShortConnection.java:49)
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:498)
	at com.grgbanking.ilink.core.utils.ExecClassMethod.invokeMethod(ExecClassMethod.java:106)
	at com.grgbanking.ilink.core.utils.ExecClassMethod.execMethod(ExecClassMethod.java:24)
	at com.grgbanking.ilink.core.bpm.handler.component.CommunicateHandler.execFlow(CommunicateHandler.java:34)
	at com.grgbanking.ilink.core.bpm.manage.GapsBpmExecute.startFlow(GapsBpmExecute.java:133)
	at com.grgbanking.ilink.core.bpm.handler.base.SubFlowItemHandler.execFlow(SubFlowItemHandler.java:41)
	at com.grgbanking.ilink.core.bpm.manage.GapsBpmExecute.startFlow(GapsBpmExecute.java:91)
	at com.grgbanking.ilink.core.bpm.handler.base.SubFlowItemHandler.execFlow(SubFlowItemHandler.java:41)
	at com.grgbanking.ilink.core.bpm.manage.GapsBpmExecute.startFlow(GapsBpmExecute.java:91)
	at com.grgbanking.ilink.core.bpm.manage.GapsBpmExecute.executeProcess(GapsBpmExecute.java:46)
	at com.grgbanking.ilink.core.server.txn.TxnFlowProcess.executeProcess(TxnFlowProcess.java:40)
	at com.grgbanking.ilink.core.server.thread.HttpBusinessThread.run(HttpBusinessThread.java:73)
	at java.lang.Thread.run(Thread.java:748)

[14:15:55.722][JSON][ERROR][EBB002] Transaction process execution exception! errorInfo:com.grgbanking.ilink.core.common.exception.transaction.GapsTxnException
	at com.grgbanking.ilink.core.bpm.manage.GapsBpmExecute.executeProcess(GapsBpmExecute.java:50)
	at com.grgbanking.ilink.core.server.txn.TxnFlowProcess.executeProcess(TxnFlowProcess.java:40)
	at com.grgbanking.ilink.core.server.thread.HttpBusinessThread.run(HttpBusinessThread.java:73)
	at java.lang.Thread.run(Thread.java:748)

[14:15:55.722][JSON][INFO ][CodeConvertHandler] CodeConvertHandler was Completed...
[14:15:55.723][JSON][INFO ][PackHandler] pack result String :
{"Body":"","Sys_Head":{"SEQ_NO":"","RET_ARRAY":{"Row":{"RET_CODE":"68","RET_MSG":"connect failed!"}},"TRAN_TIMESTAMP":"","HOST_SEQ_NO":"","RET_STATUS":"","TRAN_DATE":"","MAC":"********************************","TRAN_CODE":"301000","WS_ID":""}}
[14:15:55.724][JSON][INFO ][PackHandler] PackHandler execFlow was completed
[14:15:55.724][JSON][INFO ][TxnFlowProcess] Channel Exception BPM  end...
[14:15:55.724][JSON][INFO ][TxnBusinessThread] <END [9cc800d557704f9097972fddc6eb2202] ''''''00'>`

