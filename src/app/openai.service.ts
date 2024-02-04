import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { Observable } from 'rxjs';
import { TaskService } from './features/tasks/task.service';

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  readonly base_url = 'OPENAI_BASE_URL';
  readonly api_key = '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';

  constructor(private _taskService: TaskService) {}

  sendTextToOpenai(input: string): Observable<any> {
    const configuration = new Configuration({
      apiKey: this.api_key,
    });
    const openai = new OpenAIApi(configuration);

    return new Observable<any>((observer) => {
      openai
        .createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `根据用户发送的内容，返回一个json字符串.
        这个字符串包含两个变量：action和taskType。
        action有3个值，分别是"done"、"delete"、"unknown"。
        taskType有两个值，分别是"currentTask"、"firstTask"、"unknown"。
        没有明确说明的情况下，taskType默认为"unknown"。
        举例：
        用户输入：完成当前任务
        返回：{ action: "done", taskType: "currentTask" }
        用户输入：删除任务
        返回：{ action: "delete", taskType: "unknown" }
        用户输入：测试测试
        返回：{ action: "unknown", taskType: "unknown" }
        `,
            },
            { role: 'user', content: input },
          ],
          // 你可以根据需要调整temperature等其他可选参数
          // 可选temperature: 0.5,  // 不一定支持此参数，依据OpenAI文档
        })
        .then((chatResponse) => {
          // observer.next(chatResponse.data.choices[0]?.message?.content);

          let returnJson = chatResponse.data.choices[0]?.message?.content;
          if (returnJson !== undefined) {
            try {
              // 尝试解析 JSON 字符串
              let parsedObject = JSON.parse(returnJson);

              // 访问解析后的对象的属性
              if (parsedObject && parsedObject.action && parsedObject.taskType) {
                let action = parsedObject.action;
                //let taskType = parsedObject.taskType;
                let taskId = this._taskService.currentTaskId;
                switch (action) {
                  case 'done':
                    taskId && this._taskService.setDone(taskId);
                    break;

                  default:
                    console.error('Unknown action:', action);
                }
              }
            } catch (error) {
              console.error('Error parsing JSON:', error);
            }
          }

          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
