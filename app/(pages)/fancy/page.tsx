'use client';

import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { UserPublicSet } from '../../redux/interface';
import { fetchFancyUsers } from '../../redux/services/fancyService';
import { RootState } from '../../redux/store';
import FancyButton from './components';
import UserDetailsModal from '../components/UserDetailsModal';
import { Key, useEffect, useState } from 'react';

const Fancy = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const users = useSelector((state: RootState) => state.fancyService.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFancyUsers(new Date()) as any);
  }, []);

  return (
    <div className="flex flex-wrap justify-center min-h-screen h-relative">
      <div className="mx-auto m-20">
        <div className="flex flex-col m-10">
          <div className="flex justify-center items-center gap-4">
            <p className="font-semibold text-lg text-gray-600">test1</p>
            <span className="text-red-200 w-10 h-5 border-2 border-white dark:border-gray-800 rounded-full"></span>
          </div>
          <div className="flex justify-center items-center gap-4">
            <p className="font-semibold text-lg text-gray-600">test2</p>
            <span className="text-red-200 w-10 h-5 border-2 border-white dark:border-gray-800 rounded-full"></span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
          {users.map((user: UserPublicSet, index: Key) => (
            <div className="shadow-xl p-2 rounded-xl bg-yellow-300 w-[210px]">
              <button
                type="button"
                onClick={() => setIsModalOpen(!isModalOpen)}
                key={index}
                className="relative w-48 h-48 rounded-t-xl"
              >
                <Image
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  src={`/emoji/${user.mainPhoto}`}
                  alt={`Preview ${index}`}
                  className="rounded-t-lg object-cover hover:brightness-75"
                  draggable="false"
                />
              </button>
              <div className="w-48 h-12 bg-white rounded-b-lg border-2 p-1 pl-2">
                <div className="flex items-end gap-4">
                  <p className="font-semibold text-2xl text-gray-700">name</p>
                  <p className="font-normal text-gray-700">3km</p>
                  <FancyButton targetId={Number(user.id)} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <UserDetailsModal targetId={1} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  );
};

export default Fancy;
