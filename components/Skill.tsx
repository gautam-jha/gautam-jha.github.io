import React from 'react'
import { Skill as SkillInt, Skills } from '../config/interface'
import styles from '../styles/Skill.module.scss'

export const Skill = (props: Skills) => {
    const { skills, sectionTitle, sectionDescription, skillCategory } = props;
    return (
        <div id="skills" className={styles.fullScreen}>
            <div className={styles.skillsContainer}>
                <div className={styles.skills}>
                    <div className={styles.skills__heading}>
                        <h2>{sectionTitle}</h2>
                        <h4>{sectionDescription}</h4>
                    </div>
                    <div className={styles.skills__category}>
                    {skillCategory && skillCategory.map((category: string, index: number) => (
                        <div className={styles.skills__container} key={category}>
                            <h3 className={styles.skills__category}>{category}</h3>
                            <div className={styles.skills__list} key={index}>
                                {skills && skills.filter((skill)=>skill.category === category).map((skill: SkillInt, index: number) => (
                                    <div className={styles.skills__list__item} key={index+skill.name}>
                                        <div className={styles.skills__list__item__text}>
                                            <h4>{skill.name}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>

        </div>
    )
}
