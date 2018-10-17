import {Option} from "./Option"
import {List} from "./List"

export type Id<T> = number
export type Key<T> = string
export type IdOrKey<T> = string

export type Locale = "en" | "ja"

export interface WithId {
  readonly id: number
}

export interface WithName {
  readonly name: string
}

export interface Project extends WithId {
  readonly id: number
  readonly projectKey: string
}
export const Project = (id: number, projectKey: string) => ({id, projectKey})

export interface Issue extends WithId {
  readonly id: number
  readonly issueKey: string
  readonly projectId: number
  readonly summary: string
  readonly description: Option<string>
  readonly startDate: Option<Date>
  readonly dueDate: Option<Date>
  readonly estimatedHours: Option<number>
  readonly actualHours: Option<number>
  readonly issueType: IssueType
  readonly categories: List<Category>
  readonly versions: List<Version>
  readonly milestones: List<Version>
  readonly priority: Priority
  readonly assignee: Option<User>
  readonly parentIssueId: Option<string>
  readonly customFields: List<CustomField>
}

export const Issue = (
  id: number,
  issueKey: string,
  projectId: number,
  summary: string,
  description: Option<string>,
  startDate: Option<Date>,
  dueDate: Option<Date>,
  estimatedHours: Option<number>,
  actualHours: Option<number>,
  issueType: IssueType,
  categories: List<Category>,
  versions: List<Version>,
  milestones: List<Version>,
  priority: Priority,
  assignee: Option<User>,
  parentIssueId: Option<string>,
  customFields: List<CustomField>
): Issue => ({
  id, issueKey, projectId, summary, description,
  startDate, dueDate, estimatedHours, actualHours,
  issueType, categories, versions, milestones,
  priority, assignee, parentIssueId, customFields})

export interface User extends WithId, WithName {}
export const User = (id: number, name: string) => ({id, name})

export interface IssueType extends WithId, WithName {}
export const IssueType = (id: number, name: string) => ({id, name})

export interface Category extends WithId, WithName {}
export const Category = (id: number, name: string) => ({id, name})

export interface Version extends WithId, WithName {}
export const Version = (id: number, name: string) => ({id, name})

export interface Priority extends WithId, WithName {}
export const Priority = (id: number, name: string) => ({id, name})

export interface CustomFieldDefinition extends WithId, WithName {
  readonly typeId: number
}
export const CustomFieldDefinition = (id: number, typeId: number, name: string) => ({id, typeId, name})

export interface CustomField extends WithId {
  readonly fieldTypeId: number
  readonly value: any
}
export const CustomField = (id: number, fieldTypeId: number, value: any) => ({id, fieldTypeId, value})

export interface BacklogDefinition {
  readonly issueTypes: List<IssueType>
  readonly categories: List<Category>
  readonly versions: List<Version>
  readonly priorities: List<Priority>
  readonly users: List<User>
  readonly customFields: List<CustomFieldDefinition>
  issueTypeNames: () => string[]
  categoryNames: () => string[]
  versionNames: () => string[]
  priorityNames: () => string[]
  userNames: () => string[]
}
export const BacklogDefinition = (
  issueTypes: List<IssueType>,
  categories: List<Category>,
  versions: List<Version>,
  priorities: List<Priority>,
  users: List<User>,
  customFields: List<CustomFieldDefinition>
): BacklogDefinition => ({
  issueTypes, categories, versions, priorities, users, customFields,
  issueTypeNames: (): string[] => issueTypes.map(item => item.name),
  categoryNames: (): string[] => categories.map(item => item.name),
  versionNames: (): string[] => versions.map(item => item.name),
  priorityNames: (): string[] => priorities.map(item => item.name),
  userNames: (): string[] => users.map(item => item.name)
})

export interface UserProperty {
  readonly space: string
  readonly domain: string
  readonly apiKey: string
  readonly projectKey: string
}
export const UserProperty = (space: string, domain: string, apiKey: string, projectKey: string) => ({space, domain, apiKey, projectKey})

export const notNull = <T, U>(t: T): boolean => t != null
export const isEmpty = (str: string): boolean => str === ""
