import { IModerationStatus, ProfileTypeList } from 'oa-shared'
import { describe, expect, it } from 'vitest'

import { filterPins } from './filterPins'

describe('filterPins', () => {
  const memberFilter = {
    _id: 'member',
    filterType: 'profileType',
    label: 'member',
  }

  const tagFilter = {
    _id: 'designer',
    filterType: 'profileTag',
    label: 'Designer',
  }

  const builderFilter = {
    _id: 'builder',
    filterType: 'profileTag',
    label: 'builder',
  }

  const workspacePin = {
    _deleted: false,
    _id: 'bob_the_builder',
    moderation: IModerationStatus.ACCEPTED,
    type: ProfileTypeList.WORKSPACE,
    location: { lat: 0, lng: 0 },
    verified: true,
    creator: {
      _id: 'bob_the_builder',
      _lastActive: 'now',
      countryCode: 'uk',
      displayName: 'Bob the Builder',
      isContactableByPublic: false,
      profileType: ProfileTypeList.WORKSPACE,
      tags: [],
    },
  }

  const memberPin = {
    _deleted: false,
    _id: 'bob_the_member',
    moderation: IModerationStatus.ACCEPTED,
    type: ProfileTypeList.WORKSPACE,
    location: { lat: 0, lng: 0 },
    verified: true,
    creator: {
      _id: 'bob_the_member',
      _lastActive: 'now',
      countryCode: 'uk',
      displayName: 'Bob the Member',
      isContactableByPublic: false,
      profileType: ProfileTypeList.MEMBER,
      tags: [],
    },
  }

  const taggedMemberPin = {
    _deleted: false,
    _id: 'bob_the_tagged',
    moderation: IModerationStatus.ACCEPTED,
    type: ProfileTypeList.MEMBER,
    location: { lat: 0, lng: 0 },
    verified: true,
    creator: {
      _id: 'bob_the_tagged',
      _lastActive: 'now',
      countryCode: 'uk',
      displayName: 'Bob the Member',
      isContactableByPublic: false,
      profileType: ProfileTypeList.MEMBER,
      tags: [
        {
          _created: 'now',
          _deleted: false,
          _id: 'designer',
          label: 'Designer',
          profileType: ProfileTypeList.MEMBER,
        },
      ],
    },
  }

  const allPinsInView = [workspacePin, memberPin, taggedMemberPin]

  it('returns all pins when no filters provided', () => {
    const activePinFilters = []

    expect(filterPins(activePinFilters, allPinsInView)).toEqual(allPinsInView)
  })

  it('returns only the correct profile type pins when filter is provided', () => {
    const activePinFilters = [memberFilter]

    expect(filterPins(activePinFilters, allPinsInView)).toEqual([
      memberPin,
      taggedMemberPin,
    ])
  })

  it('returns only the pins when profile type and tag filters are provided', () => {
    const activePinFilters = [memberFilter, tagFilter]

    expect(filterPins(activePinFilters, allPinsInView)).toEqual([
      taggedMemberPin,
    ])
  })

  it('returns an empty arry when no pins meet the filter criteria', () => {
    const activePinFilters = [builderFilter]

    expect(filterPins(activePinFilters, allPinsInView)).toEqual([])
  })
})
